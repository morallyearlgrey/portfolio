interface CalendarProps {
  className: string;
}

const Calendar: React.FC<CalendarProps> = ({ className }) => {
  return (
    <iframe
      src="https://calendar.google.com/calendar/embed?src=kaisprunger%40gmail.com&ctz=America%2FNew_York&mode=AGENDA"
      className={className}
    ></iframe>
  );
};

export { Calendar };
