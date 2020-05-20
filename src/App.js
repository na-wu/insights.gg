import React from "react";
import "./App.css";

import Button from "@material-ui/core/Button";
import Header from "./components/Header"

import { TableCell, TableHead, TableRow} from "@material-ui/core";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AlertDialog from './components/woofDialog'



// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
* Moves an item from one list to another list.
*/
const move = (source, destination, droppableSource, droppableDestination) => {
  
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    color: "#eaecf0",
    fontSize: 25,
    margin: `2%`,

    // change background colour if dragging
    background: isDragging ? "#16242F" :"#0d1118",
    // styles we need to apply on draggables
    ...draggableStyle
});


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      dogsLeft: [],
      dogsRight: [],
      woofError: false
    };
  }


  myCallBack = () => {
    this.setState({
      woofError: false
    })
  }


  download = async (event) => {
    console.log("DOWNLOADING")
    console.log(this.state.items)
    console.log(this.state.selected)

    // In this case, Breed 1 is Dogs Left
    // Breed 2 is Dogs Right
    const myData = {
      "dogBreeds" : {
        "breed1Total" : this.state.dogsLeft.length,
        "breed2Total" : this.state.dogsRight.length,
        "breed1Rank": {},
        "breed2Rank" : {}
      }
    }


    // Dynamically populate the rankings in breed1Rank and breed2Rank
    for (let i = 0; i < myData.dogBreeds.breed1Total; i++){
      myData.dogBreeds.breed1Rank["rank" + (i+1).toString()] = this.state.dogsLeft[i].content
    }
    for (let i = 0; i < myData.dogBreeds.breed2Total; i++){
      myData.dogBreeds.breed2Rank["rank" + (i+1).toString()] = this.state.dogsRight[i].content
    }
    

    const filename = "DogBreeds.json"
    const json = JSON.stringify(myData)
    const blob = new Blob([json], {type:"application/json"});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a")
    link.href = href
    link.download = filename

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link);
  }

/**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
      droppable: "dogsLeft",
      droppable2: "dogsRight"
  };

  getList = id => this.state[this.id2List[id]];


  onDragEnd = (result) => {
    if (this.state.dogsLeft.length === 1 || this.state.dogsRight.length === 1) {
      console.log("Woof Invalid Action Woof")
      this.setState(prevState => ({
        woofError: !prevState.woofError
      }));
      return;
    }
    const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) { // If dropped item in same list
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );
            let state = { items };
            if (source.droppableId === "droppable2") {
                state = { dogsRight: items };
            }
            this.setState(state);
        } else { // Dropped item in a different list
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                dogsLeft: result.droppable,
                dogsRight: result.droppable2
            });
        }
  }

  async componentDidMount() {
    const url = "https://dog.ceo/api/breeds/list/all";
    const response = await fetch(url);
    const data = await response.json();

    const dogs = Object.keys(data.message)

    var i;
    // Could cause bugs one day when API does not return greater than 20 results
    for(i = 1; i <= 10; i++) {
      const random = Math.floor(Math.random()*dogs.length)
      const content = dogs[random]
      dogs.splice(random, 1)

      // Set State for Breed 1 Table
      this.setState({
        dogsLeft: [...this.state.dogsLeft, {"id" : `item-${i}`, "content" : content}]
      })
    }

    for (i = 11; i <= 20; i++) {
      const random = Math.floor(Math.random()*dogs.length)
      const content = dogs[random]
      dogs.splice(random, 1)

      
      // Set State for Breed 2 Table
      this.setState({
        dogsRight: [...this.state.dogsRight, {"id" : `item-${i}`, "content" : content}]
      })

    }
    console.log("Component mounted, Data retrieved.")
  }

  
  render () {
    return (
      <div className="App">
        <div id="nav">
          <Header />
          </div>

      <div id="parent">
      <DragDropContext
      onDragEnd={this.onDragEnd}>
      <div id="left">
      <TableHead> 
        <TableRow><TableCell>Rank</TableCell> <TableCell style={{ textAlign: 'center'}}>Breed1</TableCell></TableRow>
        </TableHead>
        <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            >
                            {this.state.dogsLeft.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                              snapshot.isDragging,
                                              provided.draggableProps.style
                                          )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
        </div>


      <div id="right"> 
      <TableHead> 
        <TableRow><TableCell>Rank</TableCell> <TableCell>Breed1</TableCell></TableRow>
        </TableHead>
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}>
                            {this.state.dogsRight.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                              snapshot.isDragging,
                                              provided.draggableProps.style
                                          )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                    )}
                </Droppable>
                </div>
        </DragDropContext>
      </div>



   <AlertDialog bool={this.state.woofError} cb={this.myCallBack}/>   

      <Button 
          id="download-button"
          variant="contained" 
          color="primary" 
          onClick={() => {this.download()}}
          >
          Download as JSON
          </Button>

      </div>
  
      
    );
  }
  
}

export default App;
