import pandas as pd

# Read CSV files into dataframes
dot_df = pd.read_csv("./finalprojdata/dotplotdata.csv")
total_df = pd.read_csv("./finalprojdata/geomapdata.csv")

# Merge dataframes on common columns "Year" and "State"
merged_df = pd.merge(dot_df, total_df, on=['Year', 'State'], how="inner")

# If you want to handle missing values, you can specify how to do it.
# For example, to fill missing values with a specific value:
# merged_df.fillna(0, inplace=True)  # Replace NaN values with 0

merged_df.to_csv("merged_data.csv", index=False)

print("Merged data saved to 'merged_data.csv'")
