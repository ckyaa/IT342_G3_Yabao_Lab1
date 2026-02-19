import { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/AlertMessage.css';

function AlertMessage({ message, onClose, dismissAfter = 0 }) {
  const hasMessage = Boolean(message?.text);

  useEffect(() => {
    if (!hasMessage || !dismissAfter || !onClose) return undefined;

    const timer = setTimeout(() => {
      onClose();
    }, dismissAfter);

    return () => clearTimeout(timer);
  }, [dismissAfter, hasMessage, onClose]);

  if (!hasMessage) return null;

  const type = message.type || 'info';
  const variantClass = `alert-message-${type}`;
  const symbols = {
    success: '✓',
    error: '!',
    warning: '!',
    info: 'i',
  };
  const symbol = symbols[type] || '!';
  const title = message.title || 'Message';

  return (
    <div className={`alert-message alert-message-popup ${variantClass}`} role="alert" aria-live="polite">
      <div className="alert-message-icon" aria-hidden="true">{symbol}</div>
      <div className="alert-message-content">
        <strong className="alert-message-title">{title}</strong>
        <span className="alert-message-text">{message.text}</span>
      </div>
      {onClose && (
        <button
          type="button"
          className="alert-message-close"
          onClick={onClose}
          aria-label="Close message"
        >
          ×
        </button>
      )}
    </div>
  );
}

AlertMessage.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  onClose: PropTypes.func,
  dismissAfter: PropTypes.number,
};

export default AlertMessage;