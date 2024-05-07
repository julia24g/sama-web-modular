import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sama_python.Results import Gen_Results
# Loading Inputs
import numpy as np
from copy import deepcopy
from time import process_time

start = process_time()

# Problem Definition
from sama_python.Fitness import fitness as cost_function

class Swarm:
    def __init__(self, InData):
        self.In_Data = InData
        PV = self.In_Data.PV
        WT = self.In_Data.WT
        Bat = self.In_Data.Bat
        DG = self.In_Data.DG
        self.nVar = 5  # number of decision variables

        # Variable: PV number, WT number, Battery number, number of DG, Rated Power Inverter
        self.VarMin = np.array([0, 0, 0, 0, 0]) * [PV, WT, Bat, DG, 1]  # Lower bound of variables
        self.VarMax = np.array([120, 240, 120, 10, 50]) * [PV, WT, Bat, DG, 1]  # Upper bound of variables

        # Velocity limits
        self.VelMax = 0.3 * (self.VarMax - self.VarMin)
        self.VelMin = -self.VelMax
        # Solution
        self.solution_best_costs = []
        self.solution_best_positions = []
        self.solution_cost_curve = []

    def optimize(self):
        Run_Time = self.In_Data.Run_Time
        nPop = self.In_Data.nPop
        MaxIt = self.In_Data.MaxIt
        c1 = self.In_Data.c1
        c2 = self.In_Data.c2
        wdamp = self.In_Data.wdamp
        w = self.In_Data.w
        plt.rcParams["font.family"] = "Times New Roman"
        fig, ax = plt.subplots()
        for tt in range(Run_Time):

            # Initialize particle positions
            particle_positions = np.random.uniform(self.VarMin, self.VarMax, (1, nPop, self.nVar))[0]
            particle_personal_best_position = deepcopy(particle_positions)

            # Initialize particle velocities
            particle_velocities = np.zeros((nPop, self.nVar))

            # Evaluate costs per initial particle
            particle_costs = np.apply_along_axis(func1d=cost_function, axis=1, arr=particle_positions, input_object=self.In_Data)
            particle_personal_best_cost = deepcopy(particle_costs)

            # Determine global best
            min_cost_index = np.argmin(particle_personal_best_cost)
            global_best_position = deepcopy(particle_personal_best_position[min_cost_index])
            global_best_cost = particle_personal_best_cost[min_cost_index]

            # Track Best Costs and Mean Costs
            best_cost, mean_cost = [], []

            # PSO Main Loop
            for it in range(1, MaxIt + 1):
                for i in range(nPop):
                    # Update Velocity
                    particle_velocities[i] = w * particle_velocities[i] + c1 * np.random.rand(self.nVar) \
                                             * (particle_personal_best_position[i] - particle_positions[i]) \
                                             + c2 * np.random.rand(self.nVar) * (
                                                         global_best_position - particle_positions[i])

                    # Apply Velocity Limits
                    particle_velocities[i] = np.minimum(np.maximum(particle_velocities[i], self.VelMin), self.VelMax)

                    # Update Position
                    particle_positions[i] += particle_velocities[i]

                    # Velocity Mirror Effect
                    is_outside = \
                    (np.less(particle_positions[i], self.VarMin) | np.greater(particle_positions[i], self.VarMax))[0]
                    particle_velocities[i][is_outside] = -particle_velocities[i][is_outside]

                    # Apply Position Limits
                    particle_positions[i] = np.minimum(np.maximum(particle_positions[i], self.VarMin), self.VarMax)

                    # Evaluation
                    particle_costs[i] = cost_function(particle_positions[i], self.In_Data)

                    # Update Personal Best
                    if particle_costs[i] < particle_personal_best_cost[i]:
                        particle_personal_best_position[i] = particle_positions[i]
                        particle_personal_best_cost[i] = particle_costs[i]

                        # Update Global Best
                        if particle_personal_best_cost[i] < global_best_cost:
                            global_best_cost = particle_personal_best_cost[i]
                            global_best_position = particle_personal_best_position[i]

                # Add new best cost and mean cost
                best_cost.append(global_best_cost)
                mean_cost.append(sum(particle_personal_best_cost) / nPop)

                # Update inertia factor
                w *= wdamp

                # Print results for current iteration
                print(
                    f'Run time = {tt}, Iteration = {it}, Best Cost = {round(global_best_cost, 4)}, Mean Cost = {round(mean_cost[-1], 4)}')

            self.solution_best_costs.append(global_best_cost)
            self.solution_best_positions.append(global_best_position)
            self.solution_cost_curve.append(best_cost)

            ax.plot(best_cost, '-.', label=str(tt+1))

        Best= [self.solution_best_costs[t] for t in range(len(self.solution_best_positions))]
        index = np.argmin(Best)
        X = self.solution_best_positions[index]

        # Run Results file

        plt.xlabel('Iteration')
        plt.ylabel('Cost of Best Solution')
        plt.title('Convergence curve')
        plt.legend()  # Display the legend
        plt.tight_layout()
        plt.savefig('sama_python/output/figs/Optimization.png', dpi=300)
        return Gen_Results(X, self.In_Data)