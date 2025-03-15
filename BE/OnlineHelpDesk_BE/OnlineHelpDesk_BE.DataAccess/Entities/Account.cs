using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class Account
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public int RoleId { get; set; }

    public int JobTypeId { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public string Address { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public bool IsDeactivated { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<AssigneeFacilityMajorAssignment> AssigneeFacilityMajorAssignments { get; set; } = new List<AssigneeFacilityMajorAssignment>();

    public virtual ICollection<BlacklistRequest> BlacklistRequestRequesters { get; set; } = new List<BlacklistRequest>();

    public virtual ICollection<BlacklistRequest> BlacklistRequestTargets { get; set; } = new List<BlacklistRequest>();

    public virtual ICollection<BlacklistedFacilityMajor> BlacklistedFacilityMajors { get; set; } = new List<BlacklistedFacilityMajor>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual JobType JobType { get; set; } = null!;

    public virtual ICollection<Report> Reports { get; set; } = new List<Report>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<ServiceRequest> ServiceRequestAssignedAssignees { get; set; } = new List<ServiceRequest>();

    public virtual ICollection<ServiceRequest> ServiceRequestRequesters { get; set; } = new List<ServiceRequest>();

    public virtual ICollection<TaskRequest> TaskRequests { get; set; } = new List<TaskRequest>();
}
