import Board from './board';
import ErrorBoundary from './error-boundry';

const App = () => {
  return (
    <div>
      <ErrorBoundary>
        <Board />
      </ErrorBoundary>
    </div>
  );
}

export default App;
