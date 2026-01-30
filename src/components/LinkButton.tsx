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
      className="group flex items-center justify-between w-full my-4 px-5 py-4
                 bg-white !text-gray-800 !no-underline
                 border border-blue-200 rounded-lg
                 hover:bg-blue-50 hover:border-blue-400 hover:!text-blue-700
                 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <span className="font-medium text-[0.9375rem]">{label}</span>
      <span className="ml-3 text-blue-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
    </a>
  );
}
