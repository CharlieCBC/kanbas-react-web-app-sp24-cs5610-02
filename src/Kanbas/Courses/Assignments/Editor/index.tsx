import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { addAssignment, updateAssignment } from "../assignmentsReducer";
import { useDispatch, useSelector } from "react-redux";
import { AssignmentsState } from "../../../store";
import * as client from "../client";

function AssignmentEditor() {
  const { assignments, assignment: initialAssignment } = useSelector(
    (state: AssignmentsState) => state.assignmentsReducer,
  );
  const [assignment, setAssignmentState] = useState(initialAssignment);
  const dispatch = useDispatch();
  const { assignmentId, courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const matchedAssignment = assignments.find(
      (item) => item._id === assignmentId,
    ) || { course: courseId };
    setAssignmentState(matchedAssignment);
  }, [assignmentId, assignments, courseId]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setAssignmentState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSave = () => {
    if (assignment._id) {
      // Existing assignment
      client.updateAssignment(assignment).then((assignment) => {
        dispatch(updateAssignment(assignment));
      });
    } else {
      // New assignment, assign a unique _id
      client.createAssignment(courseId, assignment).then((assignment) => {
        dispatch(addAssignment(assignment));
      });
    }
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  return (
    <div className="mt-3 me-1">
      <div className="d-flex justify-content-end">
        <div className="me-2" style={{ color: "green" }}>
          <FaCheckCircle />
          <span> Published</span>
        </div>
        <button className="btn btn-secondary btn-sm">
          <BsThreeDotsVertical />
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={assignment.title || ""}
          onChange={handleChange}
          className="form-control"
          placeholder="Assignment Title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={assignment.description || ""}
          onChange={handleChange}
          className="form-control"
          placeholder="Assignment Description"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="points" className="form-label">
          Points
        </label>
        <input
          id="points"
          name="points"
          value={assignment.points || ""}
          onChange={handleChange}
          className="form-control"
          placeholder="Total Points"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">
          Due Date
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={assignment.dueDate || ""}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="availableFromDate" className="form-label">
          Available From Date
        </label>
        <input
          id="availableFromDate"
          name="availableFromDate"
          type="date"
          value={assignment.availableFromDate || ""}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="availableUntilDate" className="form-label">
          Available Until Date
        </label>
        <input
          id="availableUntilDate"
          name="availableUntilDate"
          type="date"
          value={assignment.availableUntilDate || ""}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="d-flex justify-content-end">
        <Link
          to={`/Kanbas/Courses/${courseId}/Assignments`}
          className="btn btn-danger me-2"
        >
          Cancel
        </Link>
        <button onClick={handleSave} className="btn btn-success">
          Save
        </button>
      </div>
    </div>
  );
}

export default AssignmentEditor;
