/**
 * Returns true if the given role is at least the required role in the hierarchy.
 * OWNER > ADMIN > MEMBER > GUEST
 */
export function hasMinimumRole(role: string, required: string): boolean {
  const order = ['GUEST', 'MEMBER', 'ADMIN', 'OWNER'];
  return order.indexOf(role) >= order.indexOf(required);
}

/**
 * Asserts that two organization IDs are equal. Throws an error if not.
 * Useful for enforcing tenant boundaries in services.
 */
export function assertSameOrganization(
  userOrgId: string,
  resourceOrgId: string,
  context?: { userId?: string; resourceId?: string; resourceType?: string },
): void {
  if (userOrgId !== resourceOrgId) {
    const base = `Cross-org access blocked: user org ${userOrgId} -> resource org ${resourceOrgId}`;
    const details = context
      ? ` (userId=${context.userId ?? 'unknown'}, resourceType=${context.resourceType ?? 'unknown'}, resourceId=${context.resourceId ?? 'unknown'})`
      : '';

    const error = new Error(base + details);
    // Tag for easier detection in logs/filters if needed
    (error as any).code = 'CROSS_ORG_ACCESS_FORBIDDEN';
    throw error;
  }
}

