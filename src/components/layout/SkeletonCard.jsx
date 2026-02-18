const SkeletonCard=()=> {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-0">
        <div className="bg-secondary bg-opacity-25" style={{ height: 190 }} />
        <div className="card-body">
          <div className="bg-secondary bg-opacity-25 rounded" style={{ height: 18, width: "70%" }} />
          <div className="bg-secondary bg-opacity-25 rounded mt-2" style={{ height: 14, width: "45%" }} />
          <div className="bg-secondary bg-opacity-25 rounded mt-3" style={{ height: 12, width: "90%" }} />
          <div className="bg-secondary bg-opacity-25 rounded mt-2" style={{ height: 12, width: "75%" }} />
        </div>
      </div>
    </div>
  );
}
export default SkeletonCard;