export default function ResultBox({ title, content }) {
    return (
      <div className="bg-white shadow-md p-5 rounded-lg mt-5 max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="whitespace-pre-wrap text-gray-800">{content}</p>
      </div>
    );
  }
  