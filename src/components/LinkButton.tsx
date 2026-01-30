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
      className="group block w-full my-5 px-6 py-4 text-center
                 bg-amber-400 !text-gray-900 !no-underline
                 rounded-lg font-bold text-[1.0625rem]
                 hover:bg-amber-500
                 transition-all duration-200 shadow-md hover:shadow-lg"
    >
      {label}
      <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
    </a>
  );
}
