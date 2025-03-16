using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class Room
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? FacilityMajorId { get; set; }

    public int FacilityId { get; set; }

    public virtual Facility Facility { get; set; } = null!;

    public virtual ICollection<FacilityItemAssignment> FacilityItemAssignments { get; set; } = new List<FacilityItemAssignment>();

    public virtual FacilityMajor? FacilityMajor { get; set; }
}
