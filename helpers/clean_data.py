# This function cleans the downloaded datasets of residential load data
# Read each file, remove the first row, keep on the second column
# Rename file to STATE_City.Parts.csv
# Save file in backend/api folder
import os
import re
import numpy as np
import json


def clean_data():
    all_files = os.listdir("../openei")

    all_cities = {}

    sorted_files = sorted(all_files)

    for i in range(0, len(all_files)):
        f = sorted_files[i]
        print(i, f)

    # for i, f in enumerate(sorted(all_files)):
        filename = "../openei/" + f
        all_data = np.genfromtxt(filename, delimiter=",", skip_header=1)
        target_data = all_data[:,1] # we need the OpenAI data - hourly electrical load

        if len(target_data) != 8760:
            print("what", f)

        newfile = f[4:].replace("TMY3_BASE", "")
        newfile = re.sub('\d', '', newfile)
        newfile = newfile.replace("._.csv", ".csv")
        # print(newfile)
        np.savetxt(newfile, target_data, delimiter=",")

        state = newfile[0:2]
        city = newfile[3:-4].replace(".", " ")
        all_cities.setdefault(state, [])
        all_cities[state].append(city)


def get_state_cities():
    all_files = os.listdir("../backend/api/residential_load_data")
    all_cities = {}

    for newfile in all_files:
        state = newfile[0:2]
        city = newfile[3:-4].replace(".", " ")
        all_cities.setdefault(state, [])
        all_cities[state].append(city)

    with open('state-regions.json', 'w') as fp:
        json.dump(all_cities, fp)

    with open('states.json', 'w') as fp:
        json.dump(sorted(all_cities.keys()), fp)

get_state_cities()
# clean_data()

"""
error files
72 USA_CA_Fullerton.Muni.AP.722976_TMY3_BASE.csv
79 USA_CA_Lompoc.AWOS.722895_TMY3_BASE.csv
318 USA_KS_Great.Bend.AWOS.724517_TMY3_BASE.csv
"""