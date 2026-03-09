export default function ProgressSteps({ step }) {
  // step: 1 = cart, 2 = shipping, 3 = payment/done
  const steps = ["CART", "SHIPPING", "PAYMENT"];
  return (
    <div className="cart-progress">
      <div className="progress-container">
        {steps.map((label, i) => {
          const n = i + 1;
          const isActive    = n === step;
          const isCompleted = n < step;
          return (
            <div key={label} className={`progress-step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}>
              <div className="step-icon">
                {isCompleted ? "✓" : n === 1 ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                ) : `0${n}`}
              </div>
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
