import Calculator from "../components/Calculator";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Modern Calculator
      </h1>
      <Calculator />
    </div>
  );
}
