import UploadSection from "./components/UploadSection";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">AI PDF Reader</h1>
      <UploadSection />
    </div>
  );
}

export default App;
