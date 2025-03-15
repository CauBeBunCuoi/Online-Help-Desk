using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class BlacklistedFacilityMajor
{
    public int AccountId { get; set; }

    public int FacilityMajorId { get; set; }

    public int RestrictPoint { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual FacilityMajor FacilityMajor { get; set; } = null!;
}
