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
  - chart type (make sure input is one of the three)
  - labels (separated by comma)
  - data (separated by comma, make sure length matches labels length, or labels is 0 in length)
- Button: Verify/Submit to create Chart
-Scroll/click to load additional charts created by others

#Coding Approach
1. User input binding
  - Setup info area in a <form></form>
  - Getting info from users, binding to variables using jQuery (Make sure you coordinate with us to make sure youre using same variable names)
    - Converting strings from label/data to arrays
    - Make sure that labels match data lengths (or that labels are 0)
      - Create a warning and do not allow button to be pressed that shows if data/label lengths are not the same.

2. Parse
  - Initialize/Sign up for Parse and setup database to receive all the types of data
  - When submit button is pressed, create Parse object and send the user submitted data


3. Chart.js
  - Initialize canvas area
  - Create charts based on data binding gathers
  - Create charts based on Parse queries
