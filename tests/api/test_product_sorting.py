import graphene

from tests.api.utils import get_graphql_content

GET_SORTED_PRODUCTS_COLLECTION_QUERY = """
query CollectionProducts($id: ID!) {
  collection(id: $id) {
    products(first: 10) {
      edges {
        node {
          id
        }
      }
    }
  }
}
"""

COLLECTION_RESORT_QUERY = """
mutation ReorderCollectionProducts($collectionId: ID!, $moves: [MoveProductInput]!) {
  collectionReorderProducts(collectionId: $collectionId, moves: $moves) {
        collection {
      products(first: 10) {
        edges {
          node {
            name
            id
          }
        }
      }
    }
    errors {
      field
      message
    }
  }
}
"""


def test_sort_products_within_collection_invalid_id(
    staff_api_client, collection, product, permission_manage_products
):
    product_id = graphene.Node.to_global_id("Collection", product.pk)
    moves = [{"productId": product_id, "sortOrder": 1}]
    content = get_graphql_content(
        staff_api_client.post_graphql(
            COLLECTION_RESORT_QUERY,
            {
                "collectionId": graphene.Node.to_global_id("Collection", collection.pk),
                "moves": moves,
            },
            permissions=[permission_manage_products],
        )
    )["data"]["collectionReorderProducts"]

    assert content["errors"] == [
        {"field": "moves", "message": f"Couldn't resolve to a node: {product_id}"}
    ]


def test_sort_products_within_collection(
    staff_api_client,
    staff_user,
    collection,
    collection_with_products,
    permission_manage_products,
):
    pass
