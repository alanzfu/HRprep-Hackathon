#Create a chart with Chart.js without using Javascript!
Originally an idea for the halfway hackathon at HRPrep, but decided to take it on Solo to submit as part of my sample code for my application.

##How to use:
###1. Create:
  - Create a line or a bar chart!
  - Work your way down the labels and hit submit. Then your chart will appear!


###2. Search for any existing chart by Author name
  - Start typing and you'll see names pop up
  - Click on the name, and then the search button, and charts created by that user will appear!
  - Searching for a chart will stop any new charts that other users are creating from popping up.

###3. Look:
  - Discover charts made by other people using Charts!
  - These charts are stored and queried using Parse

####Versions
- **V1**: Display charts of User prompted gathered through textareas
- **V1.5**: CSS Styling
- **V2**: User will use inputs to gather data and edit inputs to change
- **V3**: Push chart data object to Parse on verify/submit, and load previous charts created
- **V4**: Search function with suggested searches

###Languages and Tools:
- HTML/CSS/Bootstrap
- Javascript/jQuery
- Chart.js
- Parse


#Coding Approach
1. User input binding
  - Setup info area in a div
  - Getting info from users, binding to variables using jQuery
    - Converting strings from label/data to arrays
    - Make sure that labels match data lengths (or that labels are 0)
      - Create a warning and do not allow submit button to be pressed that shows if data/label lengths are not the same.

2. Parse
  - Initialize/Sign up for Parse and setup database to receive all the types of data
  - When submit button is pressed, create Parse object and send the user submitted data


3. Chart.js
  - Initialize canvas area
  - Create charts based on data binding gathers
  - Create charts based on Parse queries
