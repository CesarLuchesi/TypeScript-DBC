import { PeopleDTO } from "../models/PeopleDTO";

function List({people}: PeopleDTO){

 
    return(
      <div>
        {people.map(person => (
          <div>
          <h1>{person.name}</h1>
          <p>{person.age}</p>
          <p>{person.url}</p>
          <p>{person.note}</p>
          </div>
        ))}
      </div>
    )
}

export default List;