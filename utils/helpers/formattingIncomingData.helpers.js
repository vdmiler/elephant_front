export function formattingIncomingData(incoming) {
  const output = incoming.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title.rendered,
      content: item.content.rendered,
      sponsor_email: item.sponsor_email,
      guest_menu: item.guest_menu,
      guest_price: item.guest_price,
      parent: item.parent,
      status: item.status,
    };
  });

  return output;
}
