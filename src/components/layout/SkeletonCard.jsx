import "./SkeletonCard.css";
const SkeletonCard = () => {
  return (
    <div className="skeleton-col">
      <div className="skeleton-card">
        <div className="skeleton-image" />

        <div className="skeleton-body">
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line skeleton-subtitle" />
          <div className="skeleton-line skeleton-text-long" />
          <div className="skeleton-line skeleton-text-short" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;