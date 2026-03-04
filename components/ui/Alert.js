export default function Alert({ message }) {
  return (
    <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
      {message}
    </div>
  );
}