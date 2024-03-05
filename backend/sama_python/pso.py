from time import process_time

from swarm import Swarm

def run():
    start = process_time()

    swarm = Swarm()
    swarm.optimize()

    print(process_time()-start, "Total execution time [Sec]")