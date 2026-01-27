interface LinkButtonProps {
  href: string;
  label: string;
}

export function LinkButton({ href, label }: LinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full my-4 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700
                 text-white text-center font-semibold rounded-lg
                 hover:from-blue-700 hover:to-blue-800
                 transform hover:scale-[1.02] transition-all duration-200
                 shadow-md hover:shadow-lg"
    >
      {label}
      <span className="ml-2">→</span>
    </a>
  );
}
