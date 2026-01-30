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
      className="group flex items-center justify-between w-full my-5 px-5 py-4
                 bg-amber-50 !text-amber-900 !no-underline
                 border-2 border-amber-300 rounded-lg
                 hover:bg-amber-100 hover:border-amber-400
                 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <span className="font-semibold text-base">{label}</span>
      <span className="ml-3 text-amber-500 group-hover:translate-x-1 transition-transform duration-200 text-lg">→</span>
    </a>
  );
}
