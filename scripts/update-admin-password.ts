/**
 * Update Admin Password Script
 * Run: npx tsx scripts/update-admin-password.ts
 */

import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const newPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Kalinda2026+-!'
  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { email: 'admin@kalindayapi.com' },
    data: { hashedPassword },
  })

  console.log('Admin parolasi guncellendi!')
  console.log('Email: admin@kalindayapi.com')
  console.log('Yeni Parola: Kalinda2026+-!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
