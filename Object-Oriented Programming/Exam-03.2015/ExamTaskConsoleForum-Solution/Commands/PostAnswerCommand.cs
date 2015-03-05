namespace ConsoleForum.Commands
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using ConsoleForum.Entities.Users;
    using ConsoleForum.Contracts;
    using ConsoleForum.Utility;
    using  ConsoleForum.Entities.Posts;

    public class PostAnswerCommand : AbstractCommand
    {
        public PostAnswerCommand(IForum forum)
            : base(forum)
        {
        }

        public override void Execute()
        {
            var users = this.Forum.Users;
            var questions = this.Forum.Questions;
            string body = this.Data[1];

            if (!Forum.IsLogged)
            {
                throw new CommandException(Messages.NotLogged);
            }

            if (Forum.CurrentQuestion == null)
            {
                throw new CommandException(Messages.NoQuestionOpened);
            }

            IAnswer addedAnswewr = new Answer(Forum.Answers.Count + 1, body, Forum.CurrentUser);

            this.Forum.CurrentQuestion.Answers.Add(addedAnswewr);
            this.Forum.Answers.Add(addedAnswewr);

            this.Forum.Output.AppendLine(string.Format(Messages.PostAnswerSuccess, addedAnswewr.Id));
        }
    }
}
