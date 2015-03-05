namespace ConsoleForum.Commands
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using ConsoleForum.Entities.Users;
    using ConsoleForum.Contracts;
    using ConsoleForum.Utility;

    public class ExitCommand : AbstractCommand
    {
        public ExitCommand(IForum forum)
            : base(forum)
        {
        }

        public override void Execute()
        {
            Forum.HasStarted = false;
        }
    }
}
