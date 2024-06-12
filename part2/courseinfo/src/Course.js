const Header = ({ course }) => <h1>{course}</h1>
    
const Total = ({ sum }) => <p><b>Number of exercises: {sum}</b></p>

const Part = ({ part }) => <p> {part.name} {part.exercises}</p>

const Content = ({ parts }) => {
    return (
      <div>
        {
          parts.map( (part) => {
            return (
              <Part key={part.id} part={part} />
            )
          } )
        }
      </div>
    )
}

const Course = ({course}) => {
    return  (
        <div>
          <Header course={course.name} />
          <Content  parts={course.parts} />
          <Total  sum={ course.parts.reduce(( total, item ) => total + item.exercises, 0) } />
        </div>
    )
}


export default Course;