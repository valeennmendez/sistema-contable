import "cally";

export const DatePicker = () => (
  <>
    <button
      popovertarget="cally-popover1"
      popoveranchor="cally1"
      className="input input-border"
      id="cally1"
    >
      Pick a date
    </button>

    <calendar-date class="cally bg-base-100 border border-base-300 shadow-lg rounded-box">
      <svg
        aria-label="Previous"
        className="fill-current size-4"
        slot="previous"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>

      <svg
        aria-label="Next"
        className="fill-current size-4"
        slot="next"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>

      <calendar-month></calendar-month>
    </calendar-date>
  </>
);
