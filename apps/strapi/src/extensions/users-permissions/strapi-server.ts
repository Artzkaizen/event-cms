const validateUser = (user) => {
  const requiredFields = ["firstName", "lastName", "email", "password"];
  const missingFields = requiredFields.filter((field) => !user[field]);

  if (missingFields.length > 0) {
    return { error: `Missing required fields: ${missingFields.join(", ")}` };
  }
  return { user };
};

export default (plugin) => {
  const rawAuth = plugin.controllers.auth({ strapi });

  const auth = ({ strapi }) => {
    return {
      ...rawAuth,
      register: async (ctx) => {
        const { firstName, lastName, email, locale = "en" } = ctx.request.body;

        const { error } = validateUser(ctx.request.body);
        if (error) {
          return ctx.badRequest(error);
        }
        delete ctx.request.body.firstName;
        delete ctx.request.body.lastName;
        delete ctx.request.body.phoneNumber;
        ctx.request.body.username = email;
        await rawAuth.register(ctx);
        const [user] = await strapi.entityService.findMany(
          "plugin::users-permissions.user",
          {
            filters: {
              email: {
                $eq: email,
              },
            },
          }
        );
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          user.id,
          {
            data: { firstName, lastName, locale },
          }
        );
        const filledUser = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          user.id
        );

        ctx.response.body.user = filledUser;
      },
    };
  };

  plugin.controllers.auth = auth;
  return plugin;
};
