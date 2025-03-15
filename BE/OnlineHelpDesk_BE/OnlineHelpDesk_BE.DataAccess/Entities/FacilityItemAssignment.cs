using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class FacilityItemAssignment
{
    public int FacilityItemId { get; set; }

    public int RoomId { get; set; }

    public int AreaId { get; set; }

    public int ItemCount { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Area Area { get; set; } = null!;

    public virtual FacilityItem FacilityItem { get; set; } = null!;

    public virtual Room Room { get; set; } = null!;
}
