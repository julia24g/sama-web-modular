from time import process_time

from sama_python.swarm import Swarm

def run():
    start = process_time()

    swarm = Swarm()
    answer = swarm.optimize()
    print(answer)

    print(process_time()-start, "Total execution time [Sec]")
    return answer