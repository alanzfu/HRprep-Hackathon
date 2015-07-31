#Create a chart with Chart.js without using Javascript!

###Objectives:
####Versions
- **V1**: Display charts of User prompted data through prompts on clicks of buttons
- **V1.5**: CSS Styling
- **V2**: User will use inputs to gather data and edit inputs to change
- **V3**: Push chart data object to Parse on verify/submit, and load previous charts created

###Languages and Tools:
- HTML/CSS/Bootstrap
- Javascript/jQuery
- Chart.js
- Parse

##V1 User Interaction:
- User fills out inputs with following fields
  - name
  - title
  - chart type
  - labels (separated by comma)
  - data (separated by comma)

- Press a button to create a chart
- Prompt(chart-type) with type of chart they want to create (Bar, Line, Pie)
- Prompt (label): with labels of the data they want to create
  - Separated by weird character no-one would ever use.
- Prompt (data): with labels of the data they want to create
  - Separated by commas or spaces, checks length against labels
- Prompt (title): title of the chart.
- Prompt (name): get their name
- Button: Verify/Submit to create Chart


##V1 Code:
1. Have blank spans/p with place holder text for each of the prompts
2. When user fills out the prompt
  - Check if prompt matches formatting
  - Check if prompt matches type
  - Split *label* and *data* by comma or space to create array of values
3. Verify/Submit. on click:
  - Replace data with *data* gathered from user
  - create new Chart object and show it onto canvas
  - Hide all of the previous stuff


#Work Split
###Thomas:
  - Setup info area in a <form></form>
  - Getting info from users, binding to variables using jQuery (Make sure you coordinate with us to make sure youre using same variable names)
    - Converting strings from label/data to arrays
    - Make sure that labels match data lengths (or that labels are 0)
      - Create a warning that shows if data/label lengths are not the same.
  -
###Loren
  - Initialize Parse and setup database to receive all the types of data
  - When submit button is pressed, create Parse object and send the user submitted data
  - When scrolled to bottom of page (or pressed button) query X most recent charts
  -

###Alan
  - Initialize canvas area
  - Create charts based on data Thomas gathers
  - Create charts based on Parse objects loren gathers
  - CSS Styling
