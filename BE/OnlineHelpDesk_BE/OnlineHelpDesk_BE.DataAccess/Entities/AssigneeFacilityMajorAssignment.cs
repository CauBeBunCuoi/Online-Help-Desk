using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class AssigneeFacilityMajorAssignment
{
    public int AssigneeId { get; set; }

    public int FacilityMajorId { get; set; }

    public bool IsHead { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Account Assignee { get; set; } = null!;

    public virtual FacilityMajor FacilityMajor { get; set; } = null!;
}
