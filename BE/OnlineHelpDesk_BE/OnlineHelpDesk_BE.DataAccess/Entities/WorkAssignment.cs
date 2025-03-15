using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class WorkAssignment
{
    public int AssigneeId { get; set; }

    public int? RoomId { get; set; }

    public int? AreaId { get; set; }

    public string? WorkDescription { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Area? Area { get; set; }

    public virtual Account Assignee { get; set; } = null!;

    public virtual Room? Room { get; set; }
}
