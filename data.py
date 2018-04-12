import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from sklearn.datasets.samples_generator import make_blobs

data = pd.read_csv("results.csv")
something = data["date"].str.split(pat='-', expand=True)
data["Year"] = something[0]
 
print(len(data))

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

new_df.head()

new_df["Wins"] = 0
new_df["Losses"] = 0
new_df["Draws"] = 0
new_df["Points Scored"] = 0
new_df["Points Against"] = 0

new_df.head()

# for i, r in new_df.iterrows():
#     loop_df = data.loc[(data['Year'] == r['Year']) & ((data['home_team'] == r['Country']) | (data['away_team'] == r['Country'])), :]
#     wins = 0
#     losses = 0
#     draws = 0
#     for index, row in loop_df.iterrows():
#         if row['home_score'] > row['away_score']:
#             new_df.loc[i, 'Wins'] += 1
#         elif row['home_score'] == row['away_score']:
#             new_df.loc[i, 'Draws'] += 1
#         else:
#             new_df.loc[i, 'Losses'] +=1


for i, r in new_df.iterrows():
    loop_df = data.loc[(data['Year'] == r['Year']) & ((data['home_team'] == r['Country']) | (data['away_team'] == r['Country'])), :]
    wins = 0
    losses = 0
    draws = 0
    scored = 0
    against = 0
    for index, row in loop_df.iterrows():
        if row['home_score'] > row['away_score']:
            new_df.loc[i, 'Wins'] += 1
        elif row['home_score'] == row['away_score']:
            new_df.loc[i, 'Draws'] += 1
        else:
            new_df.loc[i, 'Losses'] +=1
            
        if row['home_team'] == r['Country']:
            new_df.loc[i, 'Points Scored'] = new_df.loc[i, 'Points Scored'] + row['home_score']
            new_df.loc[i, 'Points Against'] =  new_df.loc[i, 'Points Against'] + row['away_score'] 
        else:
            new_df.loc[i, 'Points Scored'] = new_df.loc[i, 'Points Scored'] + row['away_score']
            new_df.loc[i, 'Points Against'] =  new_df.loc[i, 'Points Against'] + row['home_score']            

new_df['Ttl Games'] = new_df['Wins'] + new_df['Draws'] + new_df['Losses']
new_df['Win Pct'] = new_df['Wins'] / new_df['Ttl Games']
new_df['PPG'] = new_df['Points Scored'] / new_df['Ttl Games']

placement_df = pd.read_csv('raw_winners.csv')

new_df = pd.merge(new_df, placement_df,  how='left', left_on=['Year','Country'], right_on = ['year','team'])


new_df = new_df[new_df['Ttl Games'] != 0]

new_df.to_csv("new_dataset.csv")