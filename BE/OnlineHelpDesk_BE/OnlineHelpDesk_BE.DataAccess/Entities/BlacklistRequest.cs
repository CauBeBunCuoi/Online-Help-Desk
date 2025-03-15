using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class BlacklistRequest
{
    public int Id { get; set; }

    public int RequesterId { get; set; }

    public int TargetId { get; set; }

    public string Description { get; set; } = null!;

    public int RequestStatusId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual RequestStatus RequestStatus { get; set; } = null!;

    public virtual Account Requester { get; set; } = null!;

    public virtual Account Target { get; set; } = null!;
}
