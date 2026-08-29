
interface CourseName {
  courseName: string;
}
interface SpecialCoursePart extends CoursePartBases {
  requirements: string[];
  kind: "special";
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBases extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBases {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBases {
  backgroundMaterial: string;
  kind: "background";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | SpecialCoursePart;

interface ContentProps {
  courseParts: CoursePart[];
}

const Header = (props: CourseName) => {
    return (
        <h1>{ props.courseName }</h1>
    )
}

const Part = ({ courseParts }: ContentProps) => {
    return (
        <div>
            {courseParts.map(part => {
              switch (part.kind) {
                case "basic":
                  return (
                    <div key={part.name}>
                      <h3>
                        {part.name} {part.exerciseCount}
                      </h3>
                      <p>{part.description}</p>
                    </div>
                  );
                case "group":
                  return (
                    <div key={part.name}>
                      <h3>{part.name} {part.exerciseCount}</h3>
                      <p>Group projects: {part.groupProjectCount}</p>
                    </div>
                  );
                case "background":
                  return (
                    <div key={part.name}>
                      <h3>{part.name} {part.exerciseCount}</h3>
                      <p>{part.description}</p>
                      <p>Background material: {part.backgroundMaterial}</p>
                    </div>
                  );
                case "special":
                  return (
                    <div key={part.name}>
                      <h3>{part.name} {part.exerciseCount}</h3>
                      <p>{part.description}</p>
                      <p>Requirements: {part.requirements.join(", ")}</p>
                    </div>
                  );
                default:
                  return null;
              }
            })}
        </div>
    );
};

const Content = ({ courseParts } : ContentProps ) => {
    return (
        <div>
           <Part courseParts={courseParts}/>
        </div>
    );
};

interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
    return (
        <p>Number of exercises {props.total}</p>
    ); 
};
const App = () => {
  const courseName = "Half Stack application development";

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special",
},
];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <p>
        <Total total={totalExercises} />
      </p>
    </div>
  );
};

export default App;