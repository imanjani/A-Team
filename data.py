
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from sklearn.datasets.samples_generator import make_blobs

data = pd.read_csv("results.csv")

something = data["date"].str.split(pat='-', expand=True)
data["Year"] = something[0]

print(len(data['home_team'].unique()))
teams = data['home_team'].unique()
years = data['Year'].unique()

new_data = {}
new_data["Year"] = []
new_data["Country"] = []
for team in teams: 
    for year in years:
        new_data["Year"] = np.append(new_data["Year"], year)
        new_data["Country"] = np.append(new_data["Country"], team)

new_df = pd.DataFrame(new_data)

new_df["Wins"] = 0
new_df["Losses"] = 0
new_df["Draws"] = 0
new_df["Points Scored"] = 0
new_df["Points Against"] = 0

for i, r in new_df.iterrows():
    loop_df = data.loc[(data['Year'] == r['Year']) & ((data['home_team'] == r['Country']) | (data['away_team'] == r['Country'])), :]
    for index, row in loop_df.iterrows():
        if row['home_score'] > row['away_score']:
            r["Wins"] += 1
        elif row['home_score'] == row['away_score']:
            r["Draws"] += 1
        else:
            r["Losses"] += 1

new_df.to_csv("new_dataset.csv")