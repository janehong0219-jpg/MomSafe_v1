const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
    const dataDir = path.join(process.cwd(), '../data')
    console.log('Seeding from:', dataDir)

    // 1. NursingRoom
    try {
        const file = path.join(dataDir, '法定場所哺集乳室名單.csv')
        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, 'utf-8')
            const lines = data.split('\n').slice(1).filter(l => l.trim().length > 0)
            console.log(`Seeding ${lines.length} NursingRooms...`)
            for (const line of lines) {
                const cols = line.split(',')
                if (cols.length < 5) continue
                await prisma.nursingRoom.create({
                    data: {
                        code: cols[0],
                        name: cols[2],
                        district: cols[3],
                        openHours: cols[4] ? cols[4].replace('\r', '') : undefined
                    }
                })
            }
        }
    } catch (e) {
        console.error('Error seeding NursingRoom:', e)
    }

    // 2. Hospital
    try {
        const file = path.join(dataDir, '母嬰親善醫療院所名單.csv')
        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, 'utf-8')
            const lines = data.split('\n').slice(1).filter(l => l.trim().length > 0)
            console.log(`Seeding ${lines.length} Hospitals...`)
            for (const line of lines) {
                const cols = line.split(',')
                if (cols.length < 5) continue
                await prisma.hospital.create({
                    data: {
                        code: cols[0],
                        name: cols[2],
                        district: cols[3],
                        phone: cols[4] ? cols[4].replace('\r', '') : undefined
                    }
                })
            }
        }
    } catch (e) {
        console.error('Error seeding Hospital:', e)
    }

    // 3. PostpartumCenter
    try {
        const file = path.join(dataDir, '臺中市產後護理之家名冊(1131007).csv')
        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, 'utf-8')
            const lines = data.split('\n').slice(1).filter(l => l.trim().length > 0)
            console.log(`Seeding ${lines.length} PostpartumCenters...`)
            for (const line of lines) {
                const cols = line.split(',')
                if (cols.length < 7) continue
                const bedsPostpartum = parseInt(cols[4] || '0')
                const bedsInfant = parseInt(cols[5] || '0')
                const totalBeds = parseInt(cols[6] || '0')

                await prisma.postpartumCenter.create({
                    data: {
                        name: cols[1],
                        phone: cols[2],
                        address: cols[3],
                        bedsPostpartum,
                        bedsInfant,
                        totalBeds
                    }
                })
            }
        }
    } catch (e) {
        console.error('Error seeding PostpartumCenter:', e)
    }

    // 4. Nursery
    try {
        const file = path.join(dataDir, '公私協力及私立托嬰中心.csv')
        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, 'utf-8')
            const lines = data.split('\n').slice(1).filter(l => l.trim().length > 0)
            console.log(`Seeding ${lines.length} Nurseries...`)
            for (const line of lines) {
                const cols = line.split(',')
                if (cols.length < 6) continue
                await prisma.nursery.create({
                    data: {
                        name: cols[1],
                        phone: cols[2],
                        city: cols[3],
                        district: cols[4],
                        address: cols[5] ? cols[5].replace('\r', '') : undefined,
                        type: cols[1].includes('公設') ? 'Public' : 'Private'
                    }
                })
            }
        }
    } catch (e) {
        console.error('Error seeding Nursery:', e)
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
