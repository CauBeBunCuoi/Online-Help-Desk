using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class Facility
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool IsDeactivated { get; set; }

    public virtual ICollection<Area> Areas { get; set; } = new List<Area>();

    public virtual ICollection<Floor> Floors { get; set; } = new List<Floor>();
}
