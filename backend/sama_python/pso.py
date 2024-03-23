from time import process_time
import numpy as np

from sama_python.swarm import Swarm

def run(Input_Data):
    start = process_time()

    swarm = Swarm(Input_Data)
    answer = swarm.optimize()

    print(process_time()-start, "Total execution time [Sec]")
    return answer