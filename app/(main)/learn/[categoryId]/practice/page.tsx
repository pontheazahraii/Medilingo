interface PracticePageProps {
    params: {
      categoryId: string;
    };
  }
  
  const PracticePage = ({ params }: PracticePageProps) => {
    const categoryId = Number(params.categoryId);
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">Practice Flashcards - System {categoryId}</h1>
  
        <p className="text-lg text-gray-600">Coming soon... </p>
      </div>
    );
  };
  
  export default PracticePage;
  