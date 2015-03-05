namespace ConsoleForum.Commands
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using ConsoleForum.Entities.Users;
    using ConsoleForum.Contracts;
    using ConsoleForum.Utility;

    public class ShowQuestionsCommand : AbstractCommand
    {
        public ShowQuestionsCommand(IForum forum)
            : base(forum)
        {
        }

        public override void Execute()
        {
            var users = this.Forum.Users;
            var questions = this.Forum.Questions;

            if (!questions.Any())
            {
                throw new CommandException(Messages.NoQuestions);
            }

            var sortedQuestions = from question in questions
                                  orderby question.Id
                                  select question;

            foreach (var question in sortedQuestions)
            {
                this.Forum.Output.AppendLine(question.ToString());
            }

            this.Forum.CurrentQuestion = null;
        }
    }
}