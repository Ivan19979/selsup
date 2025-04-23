import { Component, ChangeEvent, FC } from 'react';
import { createRoot } from 'react-dom/client';

// Определение типов
interface Param {
  id: number;
  name: string;
  type?: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Color { 
  [key: string]: string;
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: Record<number, string>;
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const initialValues: Record<number, string> = {};

    props.model.paramValues.forEach(item => {
      initialValues[item.paramId] = item.value;
    });
    
    this.state = {
      paramValues: initialValues
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState(prevState => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value
      }
    }));
  };

  public getModel(): Model {
    const paramValues: ParamValue[] = Object.entries(this.state.paramValues).map(
      ([paramId, value]) => ({
        paramId: parseInt(paramId, 10),
        value
      })
    );

    return {
      ...this.props.model,
      paramValues
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map(param => (
          <div key={param.id}>
            <label >{param.name}:</label>
            <input
              type="text"
              value={paramValues[param.id] || ''}
              onChange={(event: ChangeEvent<HTMLInputElement>) => 
                this.handleParamChange(param.id, event.target.value)
              }
            />
          </div>
        ))}
      </div>
    );
  }
}

// Пример использования компонента
const App: FC = () => {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" }
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" }
    ],
    colors: []
  };

  return (
    <div>
      <ParamEditor params={params} model={model} />
    </div>
  );
};

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);
