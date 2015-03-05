namespace ConsoleForum.Commands
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using ConsoleForum.Entities.Users;
    using ConsoleForum.Contracts;
    using ConsoleForum.Utility;

    public class LogoutCommand : AbstractCommand
    {
        public LogoutCommand(IForum forum)
            : base(forum)
        {
        }

        public override void Execute()
        {
            var users = this.Forum.Users;

            if (!Forum.IsLogged)
            {
                throw new CommandException(Messages.NotLogged);
            }

            Forum.CurrentUser = null;
            Forum.CurrentQuestion = null;

            this.Forum.Output.AppendLine(
                string.Format(Messages.LogoutSuccess)
            );
        }
    }
}