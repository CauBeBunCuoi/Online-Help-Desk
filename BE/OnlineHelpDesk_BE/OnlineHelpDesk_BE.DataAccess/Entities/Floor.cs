using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class Floor
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int FacilityId { get; set; }

    public virtual Facility Facility { get; set; } = null!;

    public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();
}
