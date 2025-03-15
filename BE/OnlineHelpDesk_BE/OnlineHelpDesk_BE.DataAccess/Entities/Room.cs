using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class Room
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int FloorId { get; set; }

    public int? FacilityMajorId { get; set; }

    public virtual ICollection<FacilityItemAssignment> FacilityItemAssignments { get; set; } = new List<FacilityItemAssignment>();

    public virtual FacilityMajor? FacilityMajor { get; set; }

    public virtual Floor Floor { get; set; } = null!;
}
