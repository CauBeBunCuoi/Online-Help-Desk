using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class Feedback
{
    public int Id { get; set; }

    public int AccountId { get; set; }

    public string Content { get; set; } = null!;

    public int Rate { get; set; }

    public int FacilityMajorId { get; set; }

    public bool IsReplaced { get; set; }

    public bool IsDeactivated { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual FacilityMajor FacilityMajor { get; set; } = null!;
}
